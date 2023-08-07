export default class Messages {
  // Kullanıcı işlemleri
  static UserCreatedSuccesfull = "User created successfully";
  static LoginSuccess = "Login successful";
  static LoginFailureNotFound = "Login failed User not found";
  static LoginFailureWrongPassword = "Login failed Wrong password";
  static UserNotFound = "User not found";
  static UserAlreadyExists = "User already exists";
  static UserDeletedSuccesfull = "User deleted successfully";

  // Blog işlemleri
  static BlogListed = "Blog posts are listed";
  static BlogCreated = "New blog post created";
  static BlogUpdated = "Blog post updated successfully";
  static BlogDeleted = "Blog post deleted";
  static BlogNotFound = "Blog post not found";

  // Follow işlemleri
  static FollowsListed = "Follows are listed";
  static FollowSuccess = "User followed successfully";
  static UnfollowSuccess = "User unfollowed successfully";
  static FollowUserNotFound = "Follow failed User not found";
  static FollowerNotFound = "Follow failed Follower not found";
  static AlreadyFollowing = "Already following this user";
  static UnFollowed = "Unfollowed successfully";

  // Comment işlemleri
  static CommentListed = "Comment is listed";
  static CommentsListed = "Comments are listed";
  static CommentAdded = "Comment added successfully";
  static CommentUpdated = "Comment updated successfully";
  static CommentDeleted = "Comment deleted";
  static CommentNotFound = "Comment not found";

  // Like işlemleri
  static LikeAdded = "Liked the blog";
  static LikeRemoved = "Unliked the blog";
  static LikeNotFound = "Like not found";
  static LikeListed = "Likes are listed"
}
