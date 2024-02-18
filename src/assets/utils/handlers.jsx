import { addLikeToComment, addLikeToPost } from '../../store/posts'

export function handleClickLikePost(dispatch, post) {
	const newLikeCount = post.like ? (post.like || 0) - 1 : (post.like || 0) + 1
	dispatch(
		addLikeToPost({
			idPost: post.id,
			numOfLikes: newLikeCount,
		})
	)
}

export function handleClickLikeComment(dispatch, post, idComment) {
	const comment = post.comments.find(comm => comm.id === idComment)
	if (comment) {
		const newLikeCount = comment.likes ? 0 : 1
		dispatch(
			addLikeToComment({
				idComment: idComment,
				numOfLikes: newLikeCount,
			})
		)
	}
}
