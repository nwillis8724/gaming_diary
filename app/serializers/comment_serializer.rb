class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :rating, :username, :user_id
  belongs_to :user
  belongs_to :game

  def username
    object.user.username
  end

end
