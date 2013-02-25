require 'bcrypt'
class User < ActiveRecord::Base
  attr_accessible :name, :password, :server, :map, :donor, :email, :twitter
  attr_accessor :password

  belongs_to :server
  belongs_to :map

  before_save :encrypt_password

  validates :name, :length => { :maximum => 16 }
  validates_presence_of :name
  validates_uniqueness_of :name
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create

  def donor?
    return true if self.donor > 0
    return false if self.donor == 0
  end

  def authenticate(name, password)
    user = User.find_by_name(name)
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end
  
  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
end
