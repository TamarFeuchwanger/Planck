import { Header } from './Header'
import { ProductList } from "./ProductList";
import '../App.css'

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <ProductList />
    </div>
  );
};
