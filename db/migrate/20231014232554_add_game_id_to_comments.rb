class AddGameIdToComments < ActiveRecord::Migration[6.1]
  def change
    add_column :comments, :game_id, :integer
  end
end
