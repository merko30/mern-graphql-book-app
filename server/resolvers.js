const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongoose').Types;
ObjectId.prototype.valueOf = function () {
    return this.toString()
}

const resolvers = {
    Query: {
        message: () => 'hello',
        allBooks: (obj, args, { Book }, info) => {
            return Book.find({});
        },
        me: (obj, args, context, info) => {
            if (context.userID) {
                return context.User.findOne({ _id: context.userID.id }).populate('books');
            } else {
                throw new AuthenticationError('You are not logged in');
            }
        }, existsInBooks: async (_, { bookID }, context, info) => {
            if (!context.userID) {
                throw new AuthenticationError('You are not logged in');
            }
            const user = await context.User.findOne({ _id: context.userID.id }).populate('books');

            const book = await user.books.find(b => b.bookID == bookID)

            return book ? { exists: true, status: book.status, id: book._id } : { exists: false, status: null, id: null }
        }
        ,
    },
    Mutation: {
        addBook: async (obj, { title, authors, bookID, status, cover }, context, info) => {
            if (context.userID.id) {
                const user = await context.User.findOne({ _id: context.userID.id })
                const book = await context.Book.create({ title, bookID, status, authors, cover });
                await user.books.push(book._id);

                await user.save();

                return { message: 'Book Added' };
            } else {
                throw new AuthenticationError('You are not logged in');
            }
        },

        register: async (obj, { username, email, password }, { User }, info) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (user) {
                throw new AuthenticationError('User alredy exists');
            } else {
                const hashedPassword = await bcrypt.hashSync(password, 10);
                await User.create({ username: username, email: email, password: hashedPassword });
                return await { message: "Successfully registered" };
            }

        },
        login: async (obj, { email, password }, { User }, info) => {

            const user = await User.findOne({ email: email });

            if (!user) {
                throw new AuthenticationError('User not found');
            } else if (user) {

                const isValid = await bcrypt.compareSync(password, user.password);
                if (isValid) {
                    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                    return await { token: token }
                } else {
                    throw new AuthenticationError('Passwords don\'t match');
                }
            }
        },
        changeStatus: async (obj, { id, status }, context, info) => {

            if (context.userID.id) {
                const book = await context.Book.findOne({ _id: id });

                book.status = status;
                await book.save();

                return { message: "Book status changed" }

            } else {
                throw new AuthenticationError('You are not logged in');
            }
        },
        deleteBook: async (obj, { id }, context, info) => {
            if (context.userID) {
                const user = await context.User.findOne({ _id: context.userID.id });

                const bookIndex = user.books.findIndex(b => b._id == id);

                await context.Book.findOneAndDelete({ _id: id });

                await user.books.splice(bookIndex, 1);

                user.save();

                return { message: "Book deleted" }

            } else {
                throw new AuthenticationError('You are not logged in');
            }
        }
    }
}

module.exports = resolvers;
