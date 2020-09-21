import Layout from '@/components/layout/Layout';
import Container from '@/components/layout/Container';
import Mainvisual from '@/components/box/Mainvisual';

const Home = () => {
    return (
        <Layout layout="is-one">
            <Container>
                <Mainvisual />
            </Container>
        </Layout>
    );
};

export default Home;