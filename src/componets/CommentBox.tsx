// Comment input/display component
import { useState } from 'react';
import styles from '../styles/CommentBox.module.css';

interface CommentBoxProps {
  comments: string[];
  onAddComment: (comment: string) => void;
}

export default function CommentBox({ comments, onAddComment }: CommentBoxProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment('');
    }
  };

  return (
    <div className={styles.commentBox}>
      <h4>Comments</h4>
      <ul>
        {comments.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
