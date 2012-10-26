module ApplicationHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def rated(server)
    Rails.cache.fetch("sorted", :expires_in => 5.minutes) do
      #Map.find_all_by_server_id(server.id, :include => [:points, :likes]).sort_by { |m| [ m.likes.count, m.points.count, m.updated_at ] }.reverse
      User.find_all_by_server_id(server.id)
    end
  end

  def servers
    Rails.cache.fetch("servers", :expires_in => 9999.minutes) do
      YAML.load_file('config/servers.yml')
    end
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end 
end
