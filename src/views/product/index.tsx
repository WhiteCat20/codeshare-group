/* eslint-disable @next/next/no-img-element */
import { ProductType } from "@/types/product.type";
import styles from "./Product.module.scss";

const ProductView = ({ products }: { products: any[] }) => {
  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>Product Page</h1>
      <div className={styles.product__content}>
        {products.length > 0 ? (
          <>
            {products.map((product: any) => (
              <div className={styles.product__content__item} key={product.id}>
                <div className={styles.product__content__item__image}>
                  <img src={product.image} alt={product.name} width={300} />
                </div>
                <h4 className={styles.product__content__item__name}>
                  {product.name}
                </h4>
                <p className={styles.product__content__item__category}>
                  {product.category}
                </p>
                <p className={styles.product__content__item__price}>
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className={styles.product__content__skeleton}>
              <div className={styles.product__content__skeleton__image} />
              <div className={styles.product__content__skeleton__name} />
              <div className={styles.product__content__skeleton__category} />
              <div className={styles.product__content__skeleton__price} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductView;
