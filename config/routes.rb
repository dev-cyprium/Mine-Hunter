Rails.application.routes.draw do
  root "static_pages#home"
  get "home" => "static_pages#home"
  get "game" => "static_pages#game"
end
