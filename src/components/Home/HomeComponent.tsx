import * as React from 'react';


export const HomeComponent = ({
  children
}: {
  children: React.ReactNode;
}) => (
  <div className="home-container">
    {children}
  </div>
)

HomeComponent.Title = ({
  title
} : {
  title: string
}) => (
  <h1>{title}</h1>
)