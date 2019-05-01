FactoryBot.define do
  factory :book do
    title       { Faker::Book.title }
    description { Faker::TvShows::Simpsons }
    author      { Faker::Book.author }
    public      { true }
  end
end
