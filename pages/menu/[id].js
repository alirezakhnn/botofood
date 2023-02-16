import { useRouter } from "next/router";
import { DetailsPage } from '../../components';

function Details({ data }) {
    const router = useRouter();
    if(router.isFallback) {
        return <h1 style={{ color:'black' }}>Loading...</h1>
    }
    return <DetailsPage {...data} />
}

export default Details;

export async function getStaticPaths() {
    const res = await fetch(`${process.env.BASE_URL}/data`);
    const data = await res.json();
    const dataSlice = data.slice(0, 10);
    const paths = dataSlice.map(path => (
        {
            params: { id: path.id.toString(), }
        }
    ));

    return {
        paths,
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const { params : {
        id
    }} = context;
    const res = await fetch(`${process.env.BASE_URL}/data/${id}`);
    const data = await res.json();
    if(!data.name) {
        return {
            notFound: true,
        };
    }
    return {
        props: { data },
        revalidate: +process.env.REVALIDATE,
    }
}