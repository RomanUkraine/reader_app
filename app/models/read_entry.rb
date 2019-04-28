class ReadEntry < ApplicationRecord
  belongs_to :user
  belongs_to :book

  # TODO validation pages not negative
end
