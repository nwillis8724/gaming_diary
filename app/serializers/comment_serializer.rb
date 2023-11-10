class CommentSerializer < ActiveModel::Serializer
  attributes :id, :text, :rating

  belongs_to :user
  belongs_to :game
end
