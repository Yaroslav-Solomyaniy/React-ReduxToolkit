import React, {FC} from 'react';
import {IPost} from "../store/models/IPost";

interface PostItemProps{
    post: IPost
    update: (post: IPost) => void
    remove: (post: IPost) => void;
}

const PostItem:FC<PostItemProps> = ({post, remove, update}) => {

    const removePost = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(post)
    }

    const updatePost = (event: React.MouseEvent) => {
       const title = prompt() || '';
       update({...post, title} as IPost)
    }

    return (
        <div onClick={updatePost} className={"post"}>
            {post.id}.{post.title}
            <button onClick={removePost}>Delete</button>
        </div>
    );
};

export default PostItem;