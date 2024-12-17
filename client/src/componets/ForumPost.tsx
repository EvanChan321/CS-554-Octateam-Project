// Forum post component
import CommentBox from './CommentBox';

interface ForumPostProps {
  title: string;
  content: string;
  comments: string[];
  onAddComment: (comment: string) => void;
}

export default function ForumPost({ title, content, comments, onAddComment }: ForumPostProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
      <CommentBox comments={comments} onAddComment={onAddComment} />
    </div>
  );
}
