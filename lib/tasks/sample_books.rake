require 'faker'

namespace :sample_books do
  desc 'Create 10 sample books'
  task create: :environment do
    10.times do
      Book.create(
        title: Faker::Book.title,
        author: Faker::Book.author,
        description: Faker::Quote.yoda,
        public: true
      )
    end
  end
end
