class Comment < ApplicationRecord
    belongs_to :user, foreign_key: 'user_id'
    belongs_to :game, foreign_key: 'game_id'
end
