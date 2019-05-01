class ReadEntry < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :pages, :date, presence: true
  validate  :not_in_future
  validates :pages, numericality: { greater_than: 0 }

  private

    def not_in_future
      errors.add(:date, 'should be in the past.') if date > Time.now
    end
end
