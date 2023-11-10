class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :platform, :genre, :release_date, :image

  has_many :comments
end
