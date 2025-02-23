import { useEffect, useRef, useState } from "react";

import Loading from "src/common/Loading";

import {
  AddOrUpdateBookInput,
  useCheckBookQuery,
  Status,
} from "src/generated/index";

interface MenuItem {
  value: string;
  label: string;
}

const STATUSES: MenuItem[] = [
  { value: Status.Wishlist, label: "Wishlist" },
  { value: Status.Reading, label: "Reading" },
  { value: Status.Read, label: "Read" },
  { value: "delete", label: "Delete" },
];

interface BookMenuProps {
  book: Omit<AddOrUpdateBookInput, "status">;
  onClick: (key: Status | "delete") => void;
  className: string;
}

const BookMenu = ({ book, className, onClick }: BookMenuProps) => {
  const [statuses, setStatuses] = useState<MenuItem[]>();
  const menuRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const { data, loading, refetch } = useCheckBookQuery({
    variables: { id: book.id.toString() },
  });

  useEffect(() => {
    refetch({ id: book.id.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  useEffect(() => {
    if (book.id) {
      refetch({ id: book.id.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.id, menuVisible]);

  useEffect(() => {
    if (data?.checkBook.status) {
      setStatuses(
        STATUSES.filter(
          (status) => status.value.toLowerCase() !== data.checkBook.status
        )
      );
    } else {
      setStatuses(
        STATUSES.filter((status) => status.value.toLowerCase() !== "delete")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.checkBook.status]);

  const handleBodyClick = (e: MouseEvent | TouchEvent) => {
    if (menuRef.current) {
      if (
        !menuRef.current.contains(e.target as any) &&
        !iconRef.current?.contains(e.target as any)
      ) {
        setMenuVisible(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleBodyClick);
    window.addEventListener("touchstart", handleBodyClick);

    return () => {
      window.removeEventListener("click", handleBodyClick);
      window.removeEventListener("touchstart", handleBodyClick);
    };
  }, []);

  return (
    <>
      <span
        className={`absolute top-0 right-0 shadow-sm p-2 w-10 h-10 flex justify-center items-center bg-background_two cursor-pointer rounded-full inline-block ${className}`}
        ref={iconRef}
        onClick={() => setMenuVisible((p) => !p)}
      >
        <i className="fa fa-ellipsis-v"></i>
      </span>
      {menuVisible && (
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 mr-16 mt-8 rounded shadow-md flex flex-col`}
        >
          {loading ? (
            <Loading />
          ) : (
            statuses?.map((status) => (
              <span
                key={status.value}
                className="py-2 px-10 bg-white hover:bg-background_two cursor-pointer"
                onClick={() => {
                  onClick(status.value as Status);
                  setMenuVisible(false);
                }}
              >
                {status.label}
              </span>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default BookMenu;
