"use client";
import Link from "next/link";

const ListItem = ({ item }) => {
  console.log(item._id);
  return (
    <div className="list-item">
      <Link href={`/detail/${item._id}`}>
        <h4>{item.title}</h4>
      </Link>
      <p>{item.content}</p>
      <button
        onClick={() => {
          const formData = new FormData();
          formData.append("_id", item._id);
          fetch("/api/post/delete", {
            method: "POST",
            body: formData,
          }).then(() => {
            window.location.reload();
          });
        }}
      >
        🗑️
      </button>
    </div>
  );
};

export default ListItem;
