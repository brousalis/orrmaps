require 'bcrypt'
class User < ActiveRecord::Base
  attr_accessible :name, :password, :server, :map, :likes
  attr_accessor :password

  has_one :server
  has_one :map
  has_many :likes

  before_save :encrypt_password

  validates_presence_of :name
  validates_uniqueness_of :name
  validates_confirmation_of :password
  validates_presence_of :password, :on => :create

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

  def already_likes? map
    self.likes.find(:all, :conditions => ['map_id= ?', map.id]).size > 0
  end
end
