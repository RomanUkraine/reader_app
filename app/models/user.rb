class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable, omniauth_providers: %i[facebook]
  include DeviseTokenAuth::Concerns::User

  has_many :read_entries
  has_many :books, through: :read_entries

  # def self.from_omniauth(auth)
  #   where(email: auth['email']).first_or_create do |user|
  #     user.email = auth['email']
  #     user.password = Devise.friendly_token[0, 20]
  #     user.first_name = auth['first_name']
  #     user.last_name = auth['last_name']
  #     user.provider = 'facebook'
  #     user.uid = auth['id']
  #   end
  # end
end
