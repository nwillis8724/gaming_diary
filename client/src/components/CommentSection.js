import { React ,useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function CommentSection({game, gamesArray, i, setGamesArray}){
  const {user} = useContext(UserContext)
    const [commentValues, setCommentValues] = useState([""])
    const [ratingValues, setRatingValues] = useState([""])
    const [commentDeleteError, setCommentDeleteError] = useState(null)
    const [errorTimer, setErrorTimer] = useState(null);
    const [editMode, setEditMode] = useState(null)
    const [editedText, setEditedText] = useState("")
    const [editedRating, setEditedRating] = useState("")
    const [updateErrors, setUpdateErrors] = useState(null)

    function resetCommentValue(i) {
        const newCommentValues = [...commentValues];
        newCommentValues[i] = "";
        setCommentValues(newCommentValues);
      
        const newRatingValues = [...ratingValues];
        newRatingValues[i] = "";
        setRatingValues(newRatingValues);
      }

    function clearCommentDeleteError() {
        setCommentDeleteError(null);
    }

    function handleComment(e, game, i) {
        e.preventDefault();
      
        const newComment = {
          text: commentValues[i],
          rating: ratingValues[i],
          game_id: game.id,
        };
      
        fetch("/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
              
            }
            return response.json();
          })
          .then((newComment) => {
            const updatedGames = gamesArray.map((g) => {
              if (g.id === game.id) {
                g.comments.push(newComment);
              }
              return g;
            });
            setGamesArray(updatedGames);
          })
          .catch((error) => {
            console.error('Error adding comment:', error);
          });
      
        resetCommentValue(i);
    }

    function handleDeleteComment(comment) {
        if (user.id === comment.user_id) {
          fetch(`/comments/${comment.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                console.log('Network response was not ok');
              }
            })
            .then(() => {
              const updatedGames = gamesArray.map((game) => {
                return {
                  ...game,
                  comments: game.comments.filter((c) => c.id !== comment.id),
                };
              });
              setGamesArray([...updatedGames]);
            })
            .catch((error) => {
              console.error('Error deleting game:', error);
            });
        } else {
          setCommentDeleteError('You did not post this.');
          const timer = setTimeout(clearCommentDeleteError, 5000);
          setErrorTimer(timer);
        }
      }

      function handleEditComment(comment) {
        if (user.id === comment.user_id) {
        setEditMode(comment.id === editMode ? null : comment.id);
    
        const selectedComment = game.comments.find(c => c.id === comment.id);
        setEditedText(selectedComment.text);
        setEditedRating(selectedComment.rating);
      } else {
        setCommentDeleteError('You did not post this.');
        const timer = setTimeout(clearCommentDeleteError, 5000);
        setErrorTimer(timer);
      }
      }
    
      function handleUpdateComment(e, comment) {
        e.preventDefault();
        const updatedComment = {
          text: editedText,
          rating: editedRating,
        };
      
        fetch(`/comments/${comment.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedComment),
        })
          .then((response) => {
            if (response.status === 401) {
              response.json().then((data) => {
                console.log(data.errors, 'Unauthorized');
              });
            } else if (!response.ok) {
              response.json().then((data) => {
                setUpdateErrors(data.errors);
                const timer = setTimeout(clearCommentDeleteError, 5000);
                setErrorTimer(timer);
              });
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((updatedComment) => {
            console.log('Comment updated successfully:', updatedComment);

            const commentUpdatedGames = gamesArray.map((game) => {
              const updatedComments = game.comments.map((c) => {
                if (c.id === comment.id) {
                  return { ...c, ...updatedComment };
                }
                return c;
              });
              return { ...game, comments: updatedComments };
            });

            setGamesArray(commentUpdatedGames);
            setEditMode(null);
          })
          .catch((error) => {
            console.error('Error updating comment:', error);

          });
      }
      return (
        <div className="comment_section">
          {game.comments && game.comments.length > 0 ? (
            game.comments.map((comment, i) => {
              return (
                <div className="comment" key={i}>
                  <button className="delete_button" onClick={(e) => handleDeleteComment(comment)}>
                    {" "}
                    🗑️{" "}
                  </button>
                  <button className="edit_button" onClick={(e) => handleEditComment(comment)}>
                    🖉
                  </button>
    
                  {editMode === comment.id ? (
                    <form className="edit_form" onSubmit={(e) => handleUpdateComment(e, comment)}>
                      <input className="edit_form_text" type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} defaultValue={comment.text} />
                      <input className="edit_form_rating" type="rating" value={editedRating} onChange={(e) => setEditedRating(e.target.value)} defaultValue={comment.rating} />
                      <button className="edit_form_button" type="submit">Update</button>
                    </form>
                  ) : (
                    <>
                      <p>{comment.text}</p>
                      <p>{comment.rating}/5</p>
                      <p>{comment.username}</p>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <p>No comments yet.</p>
          )}
          {commentDeleteError && <div className="error">{commentDeleteError}</div>}
          {updateErrors && (
          <div className="error">
            {updateErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
)}
          <div>
            <form onSubmit={(e) => handleComment(e, game, i)}>
              <input
                onChange={(e) => {
                  const newCommentValues = [...commentValues];
                  newCommentValues[i] = e.target.value;
                  setCommentValues(newCommentValues);
                }}
                value={commentValues[i]}
                placeholder="Comment..."
              ></input>
              <input
                className="rating_value"
                onChange={(e) => {
                  const newRatingValues = [...ratingValues];
                  newRatingValues[i] = e.target.value;
                  setRatingValues(newRatingValues);
                }}
                value={ratingValues[i]}
                placeholder="Rating /5..."
              ></input>
              <button className="submit_button"> Add </button>
            </form>
          </div>
        </div>
      );
    }
    
    export default CommentSection;