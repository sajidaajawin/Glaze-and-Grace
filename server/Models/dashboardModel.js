const db = require('../config');
const Dashboard = {};


Dashboard.createproduct = async (product_name,product_detail,image ,price,counts,category_id) => {
        const imageUrlString = JSON.stringify(image);
        const result = await db.query('INSERT INTO products (product_name, product_detail,image ,price,counts,category_id)  VALUES ($1, $2, $3,$4,$5,$6)', [product_name, product_detail,imageUrlString,price,counts,category_id]);
        return result.rows;
    };


    Dashboard.productdetail = async (productId) => {
        try {
          const result = await db.query('SELECT products.id, products.product_name, products.product_detail,products.image,categories.category ,products.price,products.counts FROM products inner join categories on categories.id= products.category_id  where products.id = $1;', [productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };

      Dashboard.updateproduct = async (productId, product_name, product_detail, price, counts,category_id) => {
        try {
        //   const imageUrlString = JSON.stringify(image);
          const result = await db.query('UPDATE products SET product_name=$1, product_detail=$2, price=$3, counts=$4,category_id=$5 WHERE id=$6', [product_name, product_detail, price, counts,category_id, productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };

      Dashboard.allproducts = async () => {
        try {
        const result = await db.query('SELECT products.id, products.product_name, products.product_detail,products.image,categories.category ,products.price,products.counts FROM products inner join categories on categories.id= products.category_id  where is_deleted = false;');
        return result.rows;
      } catch (err) {
        throw err;
      }
  }

      Dashboard.deleteproduct = async (productId) => {
        try {
         
          const result = await db.query('UPDATE products SET is_deleted = TRUE  WHERE id = $1', [productId]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };


      Dashboard.mesaages = async () => {
        try{
            console.log("here in model");
            const query = await db.query('select * from contactus');
            return query.rows;
        }catch(error){
            console.log("error in model ");
            return "error in contactus"
        }
      }
module.exports = Dashboard;
