import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddOrUpdateBookInput = {
  authors: Array<Scalars["String"]>;
  id: Scalars["String"];
  status: Status;
  thumbnail: Scalars["String"];
  title: Scalars["String"];
};

export type Author = {
  __typename?: "Author";
  id: Scalars["Float"];
  name: Scalars["String"];
};

export type Book = {
  __typename?: "Book";
  _id: Scalars["String"];
  authors: Array<Scalars["String"]>;
  id: Scalars["String"];
  status: Status;
  thumbnail: Scalars["String"];
  title: Scalars["String"];
};

export type BooksInput = {
  page?: InputMaybe<Scalars["Float"]>;
  perPage?: InputMaybe<Scalars["Float"]>;
  status?: InputMaybe<Status>;
};

export type BooksResponse = {
  __typename?: "BooksResponse";
  books: Array<Book>;
  totalPages: Scalars["Float"];
};

export type BooleanResponse = {
  __typename?: "BooleanResponse";
  ok: Scalars["Boolean"];
};

export type CountResponse = {
  __typename?: "CountResponse";
  read: Scalars["Float"];
  reading: Scalars["Float"];
  wishlist: Scalars["Float"];
};

export type GoogleBook = {
  __typename?: "GoogleBook";
  id: Scalars["String"];
  volumeInfo: VolumeInfo;
};

export type ImageLinks = {
  __typename?: "ImageLinks";
  extraLarge?: Maybe<Scalars["String"]>;
  large?: Maybe<Scalars["String"]>;
  medium?: Maybe<Scalars["String"]>;
  small?: Maybe<Scalars["String"]>;
  smallThumbnail?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
};

export type LoginInput = {
  emailOrUsername: Scalars["String"];
  password: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  token: Scalars["String"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  addOrUpdateBook: Book;
  deleteBook: BooleanResponse;
  login: LoginResponse;
  register: BooleanResponse;
};

export type MutationAddOrUpdateBookArgs = {
  input: AddOrUpdateBookInput;
};

export type MutationDeleteBookArgs = {
  id: Scalars["String"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: "Query";
  books: BooksResponse;
  checkBook: StatusResponse;
  counts: CountResponse;
  getSingleBook: GoogleBook;
  me: User;
  search: Array<GoogleBook>;
};

export type QueryBooksArgs = {
  input?: InputMaybe<BooksInput>;
};

export type QueryCheckBookArgs = {
  id: Scalars["String"];
};

export type QueryGetSingleBookArgs = {
  id: Scalars["String"];
};

export type QuerySearchArgs = {
  term: Scalars["String"];
};

export type RegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export enum Status {
  Read = "read",
  Reading = "reading",
  Wishlist = "wishlist",
}

export type StatusResponse = {
  __typename?: "StatusResponse";
  status?: Maybe<Scalars["String"]>;
};

export type UpdateResponse = {
  __typename?: "UpdateResponse";
  message: Scalars["String"];
  user: User;
};

export type User = {
  __typename?: "User";
  _id: Scalars["String"];
  email: Scalars["String"];
  username: Scalars["String"];
};

export type UserInput = {
  about?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type VolumeInfo = {
  __typename?: "VolumeInfo";
  authors: Array<Scalars["String"]>;
  averageRating: Scalars["Float"];
  categories: Array<Scalars["String"]>;
  description: Scalars["String"];
  imageLinks?: Maybe<ImageLinks>;
  mainCategory: Scalars["String"];
  pageCount: Scalars["Float"];
  publishedDate: Scalars["String"];
  publisher: Scalars["String"];
  ratingsCount: Scalars["Float"];
  title: Scalars["String"];
};

export type AddOrUpdateBookMutationVariables = Exact<{
  input: AddOrUpdateBookInput;
}>;

export type AddOrUpdateBookMutation = {
  __typename?: "Mutation";
  addOrUpdateBook: {
    __typename?: "Book";
    _id: string;
    authors: Array<string>;
    title: string;
    id: string;
    thumbnail: string;
    status: Status;
  };
};

export type BooksQueryVariables = Exact<{
  input: BooksInput;
}>;

export type BooksQuery = {
  __typename?: "Query";
  books: {
    __typename?: "BooksResponse";
    totalPages: number;
    books: Array<{
      __typename?: "Book";
      _id: string;
      id: string;
      title: string;
      thumbnail: string;
      status: Status;
      authors: Array<string>;
    }>;
  };
};

export type CheckBookQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type CheckBookQuery = {
  __typename?: "Query";
  checkBook: { __typename?: "StatusResponse"; status?: string | null };
};

export type CountsQueryVariables = Exact<{ [key: string]: never }>;

export type CountsQuery = {
  __typename?: "Query";
  counts: {
    __typename?: "CountResponse";
    wishlist: number;
    reading: number;
    read: number;
  };
};

export type DeleteBookMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteBookMutation = {
  __typename?: "Mutation";
  deleteBook: { __typename?: "BooleanResponse"; ok: boolean };
};

export type GetSingleBookQueryVariables = Exact<{
  id: Scalars["String"];
}>;

export type GetSingleBookQuery = {
  __typename?: "Query";
  getSingleBook: {
    __typename?: "GoogleBook";
    id: string;
    volumeInfo: {
      __typename?: "VolumeInfo";
      title: string;
      description: string;
      averageRating: number;
      ratingsCount: number;
      authors: Array<string>;
      pageCount: number;
      publisher: string;
      publishedDate: string;
      mainCategory: string;
      categories: Array<string>;
      imageLinks?: {
        __typename?: "ImageLinks";
        smallThumbnail?: string | null;
        thumbnail?: string | null;
        small?: string | null;
        medium?: string | null;
        large?: string | null;
        extraLarge?: string | null;
      } | null;
    };
  };
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    token: string;
    user: { __typename?: "User"; _id: string; username: string; email: string };
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: { __typename?: "User"; username: string; email: string; _id: string };
};

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: { __typename?: "BooleanResponse"; ok: boolean };
};

export type SearchQueryVariables = Exact<{
  term: Scalars["String"];
}>;

export type SearchQuery = {
  __typename?: "Query";
  search: Array<{
    __typename?: "GoogleBook";
    id: string;
    volumeInfo: {
      __typename?: "VolumeInfo";
      title: string;
      description: string;
      averageRating: number;
      ratingsCount: number;
      authors: Array<string>;
      pageCount: number;
      publisher: string;
      publishedDate: string;
      mainCategory: string;
      categories: Array<string>;
      imageLinks?: {
        __typename?: "ImageLinks";
        smallThumbnail?: string | null;
        thumbnail?: string | null;
        small?: string | null;
        medium?: string | null;
        large?: string | null;
        extraLarge?: string | null;
      } | null;
    };
  }>;
};

export const AddOrUpdateBookDocument = gql`
  mutation addOrUpdateBook($input: AddOrUpdateBookInput!) {
    addOrUpdateBook(input: $input) {
      _id
      authors
      title
      id
      thumbnail
      status
    }
  }
`;
export type AddOrUpdateBookMutationFn = Apollo.MutationFunction<
  AddOrUpdateBookMutation,
  AddOrUpdateBookMutationVariables
>;

/**
 * __useAddOrUpdateBookMutation__
 *
 * To run a mutation, you first call `useAddOrUpdateBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOrUpdateBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOrUpdateBookMutation, { data, loading, error }] = useAddOrUpdateBookMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOrUpdateBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddOrUpdateBookMutation,
    AddOrUpdateBookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddOrUpdateBookMutation,
    AddOrUpdateBookMutationVariables
  >(AddOrUpdateBookDocument, options);
}
export type AddOrUpdateBookMutationHookResult = ReturnType<
  typeof useAddOrUpdateBookMutation
>;
export type AddOrUpdateBookMutationResult =
  Apollo.MutationResult<AddOrUpdateBookMutation>;
export type AddOrUpdateBookMutationOptions = Apollo.BaseMutationOptions<
  AddOrUpdateBookMutation,
  AddOrUpdateBookMutationVariables
>;
export const BooksDocument = gql`
  query books($input: BooksInput!) {
    books(input: $input) {
      books {
        _id
        id
        title
        thumbnail
        status
        authors
      }
      totalPages
    }
  }
`;

/**
 * __useBooksQuery__
 *
 * To run a query within a React component, call `useBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBooksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBooksQuery(
  baseOptions: Apollo.QueryHookOptions<BooksQuery, BooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    options
  );
}
export function useBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BooksQuery, BooksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BooksQuery, BooksQueryVariables>(
    BooksDocument,
    options
  );
}
export type BooksQueryHookResult = ReturnType<typeof useBooksQuery>;
export type BooksLazyQueryHookResult = ReturnType<typeof useBooksLazyQuery>;
export type BooksQueryResult = Apollo.QueryResult<
  BooksQuery,
  BooksQueryVariables
>;
export const CheckBookDocument = gql`
  query checkBook($id: String!) {
    checkBook(id: $id) {
      status
    }
  }
`;

/**
 * __useCheckBookQuery__
 *
 * To run a query within a React component, call `useCheckBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckBookQuery(
  baseOptions: Apollo.QueryHookOptions<CheckBookQuery, CheckBookQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckBookQuery, CheckBookQueryVariables>(
    CheckBookDocument,
    options
  );
}
export function useCheckBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckBookQuery,
    CheckBookQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckBookQuery, CheckBookQueryVariables>(
    CheckBookDocument,
    options
  );
}
export type CheckBookQueryHookResult = ReturnType<typeof useCheckBookQuery>;
export type CheckBookLazyQueryHookResult = ReturnType<
  typeof useCheckBookLazyQuery
>;
export type CheckBookQueryResult = Apollo.QueryResult<
  CheckBookQuery,
  CheckBookQueryVariables
>;
export const CountsDocument = gql`
  query counts {
    counts {
      wishlist
      reading
      read
    }
  }
`;

/**
 * __useCountsQuery__
 *
 * To run a query within a React component, call `useCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountsQuery(
  baseOptions?: Apollo.QueryHookOptions<CountsQuery, CountsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CountsQuery, CountsQueryVariables>(
    CountsDocument,
    options
  );
}
export function useCountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountsQuery, CountsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CountsQuery, CountsQueryVariables>(
    CountsDocument,
    options
  );
}
export type CountsQueryHookResult = ReturnType<typeof useCountsQuery>;
export type CountsLazyQueryHookResult = ReturnType<typeof useCountsLazyQuery>;
export type CountsQueryResult = Apollo.QueryResult<
  CountsQuery,
  CountsQueryVariables
>;
export const DeleteBookDocument = gql`
  mutation deleteBook($id: String!) {
    deleteBook(id: $id) {
      ok
    }
  }
`;
export type DeleteBookMutationFn = Apollo.MutationFunction<
  DeleteBookMutation,
  DeleteBookMutationVariables
>;

/**
 * __useDeleteBookMutation__
 *
 * To run a mutation, you first call `useDeleteBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookMutation, { data, loading, error }] = useDeleteBookMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBookMutation,
    DeleteBookMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteBookMutation, DeleteBookMutationVariables>(
    DeleteBookDocument,
    options
  );
}
export type DeleteBookMutationHookResult = ReturnType<
  typeof useDeleteBookMutation
>;
export type DeleteBookMutationResult =
  Apollo.MutationResult<DeleteBookMutation>;
export type DeleteBookMutationOptions = Apollo.BaseMutationOptions<
  DeleteBookMutation,
  DeleteBookMutationVariables
>;
export const GetSingleBookDocument = gql`
  query getSingleBook($id: String!) {
    getSingleBook(id: $id) {
      id
      volumeInfo {
        title
        description
        averageRating
        ratingsCount
        authors
        imageLinks {
          smallThumbnail
          thumbnail
          small
          medium
          large
          extraLarge
        }
        pageCount
        publisher
        publishedDate
        mainCategory
        categories
      }
    }
  }
`;

/**
 * __useGetSingleBookQuery__
 *
 * To run a query within a React component, call `useGetSingleBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleBookQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSingleBookQuery,
    GetSingleBookQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSingleBookQuery, GetSingleBookQueryVariables>(
    GetSingleBookDocument,
    options
  );
}
export function useGetSingleBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSingleBookQuery,
    GetSingleBookQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSingleBookQuery, GetSingleBookQueryVariables>(
    GetSingleBookDocument,
    options
  );
}
export type GetSingleBookQueryHookResult = ReturnType<
  typeof useGetSingleBookQuery
>;
export type GetSingleBookLazyQueryHookResult = ReturnType<
  typeof useGetSingleBookLazyQuery
>;
export type GetSingleBookQueryResult = Apollo.QueryResult<
  GetSingleBookQuery,
  GetSingleBookQueryVariables
>;
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      username
      email
      _id
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ok
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const SearchDocument = gql`
  query search($term: String!) {
    search(term: $term) {
      id
      volumeInfo {
        title
        description
        averageRating
        ratingsCount
        authors
        imageLinks {
          smallThumbnail
          thumbnail
          small
          medium
          large
          extraLarge
        }
        pageCount
        publisher
        publishedDate
        mainCategory
        categories
      }
    }
  }
`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useSearchQuery(
  baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export function useSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(
    SearchDocument,
    options
  );
}
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<
  SearchQuery,
  SearchQueryVariables
>;
