module ApplicationHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def servers
    Rails.cache.fetch("servers", :expires_in => 9999.minutes) do
      YAML.load_file('config/servers.yml')
    end
  end

  def underscore(server)
    return server.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')
  end

  def points_for_map(map_id)
    @point_counts[map_id] || 0
  end

  def likes_for_map(map_id)
    @like_counts[map_id] || 0
  end
end
