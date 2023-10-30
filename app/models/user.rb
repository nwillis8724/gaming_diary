class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validate :password_complexity
  
    has_many :comments
    has_many :games, through: :comments
  
    private
  
    def password_complexity
      return unless password.present?
  
      # Check for a capital letter
      unless password =~ /[A-Z]/
        errors.add(:password, "must include at least one capital letter")
      end
 
      unless password =~ /[!@#\$%^&*.|]/
        errors.add(:password, "must include at least one special character")
      end
    end
  end
