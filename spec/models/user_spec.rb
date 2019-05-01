require 'rails_helper'

RSpec.describe User, type: :model do
  context "associations" do
    [:assigned_books, :read_entries].each do |assoc|
      it { should have_many(assoc) }
    end
    it { should have_many(:books).through(:assigned_books) }
  end
end
