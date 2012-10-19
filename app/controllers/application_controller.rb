class ApplicationController < ActionController::Base
  before_filter :log_additional_data

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def rated(server)
    #@rated = Map.find_all_by_server_id(@server.id).collect{|m|{:map=>m,:count=>m.likes.count}}.sort{|a,b| b[:count] <=> a[:count]}
    Map.find_all_by_server_id(server.id, :order => "updated_at DESC") 
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end 

  protected
    def log_additional_data
      request.env["exception_notifier.exception_data"] = {
        :user => current_user,
      }
    end
end
