class AddUserIdToGamesAndComments < ActiveRecord::Migration[6.1]
  def change
    add_reference :games_and_comments, :user, null: false, foreign_key: true
  end
end
