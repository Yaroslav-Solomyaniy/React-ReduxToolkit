import React, {useEffect, useState} from 'react';
import {postAPI, useFetchAllPostsQuery} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../store/models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(100)
    const {data: posts, error, isLoading} = useFetchAllPostsQuery(limit)
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()
    const [updatePost,{}] = postAPI.useUpdatePostMutation()

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setLimit(3)
    //     },2000)
    // },[])

    const handleClick =async () => {
        const title = prompt();
        await createPost({title, body: title} as IPost)

    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div>
            <button onClick={handleClick}>Добавить пост</button>
            {isLoading && (<h1>Загрузка....</h1>)}
            {error && (<h1>Произошла ошибка при загрузке</h1>)}
            {posts && posts.map(item=> (<PostItem remove={handleRemove} update={handleUpdate} key={item.id} post={item}/>))}
        </div>
    );
};

export default PostContainer;