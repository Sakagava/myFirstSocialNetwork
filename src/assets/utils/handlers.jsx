import { addLikeInPost } from '../../store/posts'

export const handleClickLike = (post, dispatch) => {
	const newLikeCount = post.like > 0 ? post.like - 1 : post.like + 1
	dispatch(
		addLikeInPost({
			idPost: post.id,
			numOfLikes: newLikeCount,
		})
	)
}

export const handleClickLikeComment = (comment, post, dispatch) => {
	const newLikeCount = comment.like > 0 ? comment.like - 1 : comment.like + 1
	// Update the comment's like count
	// Here you need to dispatch an action to update the comment's like count in the store
}
