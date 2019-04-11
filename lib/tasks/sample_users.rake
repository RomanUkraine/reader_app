require 'faker'

namespace :sample_users do
  desc 'Create 10 sample users'
  task create: :environment do
    10.times do
      User.create(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.email,
        password: 'password',
        password_confirmation: 'password'
      )
    end
  end
end
