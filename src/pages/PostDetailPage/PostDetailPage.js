import { useParams } from "react-router";
import useSendGETAPI from '../../shared/hooks/useSendGETAPI/useSendGETAPI';

const PostDetailPage = () => {
    const { id } = useParams();

    const convertResponseToData = (response) => ({
        id: response.data.id,
        title: response.data.title,
        body: response.data.body,
    });

    const { isLoading, data, errorMessage } = useSendGETAPI(
        { id: null, title: null, body: null},
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        convertResponseToData
    );
    const post = data;

    if (errorMessage) return <p>{errorMessage}</p>;
    return (
        <div className="home">
            <div>ID: {post.id} </div>
            <div>Title: {post.title} </div>
            <div>Body: {post.body} </div>
        </div>
    );
};
export default PostDetailPage;