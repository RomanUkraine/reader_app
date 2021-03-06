class User < ApplicationRecord
  acts_as_token_authenticatable

  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: %i[github]

  has_many :assigned_books, dependent: :destroy
  has_many :read_entries, dependent: :destroy
  has_many :books, through: :assigned_books

  def self.from_omniauth(auth)
    info = auth['info']
    where(email: info['email']).first_or_create do |user|
      user.email = info['email']
      user.password = Devise.friendly_token[0, 20]
      user.first_name = info['name']
      user.provider = 'github'
      user.uid = auth['uid']
    end
  end
end
