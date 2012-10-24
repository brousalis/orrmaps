class ApplicationController < ActionController::Base
  before_filter :log_additional_data

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  helper_method :current_user

  def rated(server)
    Map.find_all_by_server_id(server.id).sort_by { |m| [ m.updated_at, m.points.count, m.likes.count ] }
  end
  helper_method :rated

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end 
  helper_method :underscore

  protected
    def log_additional_data
      request.env["exception_notifier.exception_data"] = {
        :user => current_user,
      }
    end
end
