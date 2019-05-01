class Book < ApplicationRecord
  default_scope { order(created_at: :desc) }
  scope :publicly_visible, ->(id) { where(public: true).or(where(user_id: id)) }
  # because we want to show the user both public books
  # and those created by him (either public or not)
 # TODO fix scope

  has_many :users, through: :assigned_books, dependent: :destroy
  belongs_to :user, optional: true
  # optional because rails 5 triggers a validation error
  # if the association is not present (and we have a rake task)
  # to create sample books

  validates :title, :author, :description, presence: true
  validates :title, :author, :description, length: { minimum: 3, maximum: 150 }
  validates :public, inclusion: [true, false]

end
