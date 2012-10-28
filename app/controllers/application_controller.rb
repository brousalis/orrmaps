class ApplicationController < ActionController::Base
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def servers
    Rails.cache.fetch("servers/all/sorted", :expires_in => 9999.minutes) do
      Server.find(:all).group_by { |server| server.country }
    end
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end
end
