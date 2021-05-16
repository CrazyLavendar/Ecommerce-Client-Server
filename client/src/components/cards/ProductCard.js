import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const { Meta } = Card;
  const { title, description, images, slug } = product;
  return (
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
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br />
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" onClick={() => {}} />
          <br />
          Add to cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
