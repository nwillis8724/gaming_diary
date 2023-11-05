class Game < ApplicationRecord
    has_many :comments
    has_many :users, through: :comments
  
    validates :title, presence: true, uniqueness: true
    validates :platform, :genre, :image, presence: true
  end
