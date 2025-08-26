import Link from "next/link";

const ListItem = ({ item }) => {
  console.log(item._id);
  return (
    <div className="list-item">
      <Link href={`/detail/${item._id}`}>
        <h4>{item.title}</h4>
      </Link>
      <p>{item.content}</p>
    </div>
  );
};

export default ListItem;
