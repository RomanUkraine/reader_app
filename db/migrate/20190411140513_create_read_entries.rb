class CreateReadEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :read_entries do |t|
      t.references :user, foreign_key: true
      t.references :book, foreign_key: true
      t.integer :pages
      t.datetime :date

      t.timestamps
    end
  end
end
