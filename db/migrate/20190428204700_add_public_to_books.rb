class AddPublicToBooks < ActiveRecord::Migration[5.2]
  def change
    add_column :books, :public, :boolean, default: false
  end
end
