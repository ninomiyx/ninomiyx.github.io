import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addNewPost, fetchPosts, Post } from './postsSlice';
import '../form.css';

const AddPostForm: React.FunctionComponent = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [addRequestStatus, setAddRequestStatus] = React.useState('idle');
  const userName = useSelector<RootState, string | undefined>(
    (state) => state.user.user?.displayName,
  );
  const userId = useSelector<RootState, number | undefined>(
    (state) => state.user.user?.id,
  );

  const author = userName !== undefined ? userName : 'Anonymous';
  const dispatch = useDispatch();

  const newPost: Post = {
    id: -1,
    title,
    content,
    reactions: {},
    lastModifiedTimestamp: new Date().getTime(),
    postTimestamp: new Date().getTime(),
    authorId: userId !== undefined ? userId : 0,
    displayName: author,
  };

  const onTitleChanged = (e: React.FormEvent<HTMLInputElement>): void => {
    setTitle(e.currentTarget.value);
  };
  const onContentChanged = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setContent(e.currentTarget.value);
  };
  const canSave = author !== 'Anonymous' && [title, content].every(Boolean) && addRequestStatus === 'idle';
  const onSaveClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        newPost.title = title;
        newPost.content = content;
        // dispatch(addNewPost) return a promise
        // and we can await it to know when thunk has finished the request
        // but we do not know whether this request is fulfilled or rejected
        // .unwrap() can help
        await dispatch(addNewPost(newPost));
        setTitle('');
        setContent('');
        await dispatch(fetchPosts({ page: 1, pageSize: 10 }));
      } catch (err) {
        console.log('Fail to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <section className="input-group">
      <h2 className="h2">Add a New Post</h2>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text">Post Title</span>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            className="form-control"
            value={title}
            onChange={onTitleChanged}
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            Author:
            {' '}
            { author }
          </span>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Post Content</span>
          <textarea
            id="postContent"
            name="postContent"
            className="form-control"
            value={content}
            onChange={onContentChanged}
          />
        </div>
        <div>
          <button type="button" onClick={onSaveClicked} disabled={!canSave} className="button">Save</button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
