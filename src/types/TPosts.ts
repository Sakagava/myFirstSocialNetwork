import { TComment } from './TComments'

export type TPost = {
	userId: number
	id: number
	title: string
	body: string
	comments?: TComment[] | []
	likes?: number[]
}
