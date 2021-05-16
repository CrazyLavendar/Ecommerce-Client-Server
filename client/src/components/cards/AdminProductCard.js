import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminProductCard = ({ product, handleRemove }) => {
  const { Meta } = Card;
  // destructure
  const { title, description, images, slug } = product;

  return (
    //     <Card
    //       cover={
    //         <img
    //           src={images && images.length ? images[0].url : "/no-image.jpg"}
    //           style={{ height: "150px", objectFit: "cover" }}
    //           className="m-2"
    //         />
    //       }
    //     >
    //       <Meta title={title} description={description} />
    //     </Card>
    //   );

    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          style={{ width: 300 }}
          className="m-2"
          alt="example"
          src={images && images.length ? images[0].url : "/images/no-image.jpg"}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
