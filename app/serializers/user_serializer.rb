class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :created_at, :password_digest

  has_many :comments
end