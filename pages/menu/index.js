import { MenuPage } from '../../components';

function Menu({ data }) {
    return <MenuPage  menu={data} />
}

export default Menu;

export async function getStaticProps() {
    const res = await fetch(`${process.env.BASE_URL}/data`);
    const data = await res.json();
    
    return {
        props: {data},
        revalidate: +process.env.REVALIDATE,
    }
}