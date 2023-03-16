interface CommentsObj {
  userId: string;
  postId: string;
  content: string;
}

export interface PostsDataObj {
  title: string;
  content: string;
  userId: string;
  media: string;
  caption: string;
  likes: number;
  comments: CommentsObj[];
}
